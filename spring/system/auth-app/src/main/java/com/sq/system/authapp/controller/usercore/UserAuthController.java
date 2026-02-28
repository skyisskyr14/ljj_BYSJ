package com.sq.system.authapp.controller.usercore;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.sq.system.captcha.support.CaptchaDispatcher;
import com.sq.system.common.annotation.AdminLog;
import com.sq.system.common.annotation.UserLog;
import com.sq.system.common.result.ResponseResult;
import com.sq.system.common.utils.CookieUtil;
import com.sq.system.common.utils.IpUtil;
import com.sq.system.common.utils.JwtUtil;
import com.sq.system.framework.redis.UserIpAccessService;
import com.sq.system.framework.redis.UserTokenService;
import com.sq.system.security.context.UserTokenContextHolder;
import com.sq.system.usercore.dto.UserChangeDto;
import com.sq.system.usercore.dto.UserLoginDTO;
import com.sq.system.usercore.dto.UserRegisterDTO;
import com.sq.system.usercore.entity.UserEntity;
import com.sq.system.usercore.entity.UserOperationLogEntity;
import com.sq.system.usercore.entity.UserToRoleEntity;
import com.sq.system.usercore.model.UserAuthModel;
import com.sq.system.usercore.repository.UserRepository;
import com.sq.system.usercore.repository.UserToProjectRepository;
import com.sq.system.usercore.repository.UserToRoleRepository;
import com.sq.system.usercore.vo.UserLoginVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/auth/user")
@Tag(name = "用户认证接口")
public class UserAuthController {

    private final UserAuthModel model;

    @Resource
    private UserRepository userRepository;
    @Resource
    private CaptchaDispatcher captchaDispatcher;
    @Resource
    private UserIpAccessService userIpAccessService;
    @Autowired
    private UserTokenService userTokenService;
    @Autowired
    private UserToRoleRepository userToRoleRepository;

    public UserAuthController(UserRepository userRepository,
                              CaptchaDispatcher captchaDispatcher,
                              UserToProjectRepository userToProjectRepository,
                              UserToRoleRepository userToRoleRepository) {
        this.model = new UserAuthModel(userRepository, captchaDispatcher, userToProjectRepository, userToRoleRepository);
    }

    @PostConstruct
    public void init() {
        System.out.println("Cont======[1/2 system/authapp/user] UserAuthController 初始化完成 ======");
    }

    @GetMapping("/auth-token")
    @Operation(summary = "用户自动登录验证")
    public ResponseResult<String> autnToken(HttpServletResponse response, HttpServletRequest request) {
        String ip = IpUtil.getIp(request);
        String uri = request.getRequestURI();

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (token == null || token.isEmpty()) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("token".equals(c.getName())) {
                        token = c.getValue();
                        break;
                    }
                }
            }
        }

        boolean isToken = userTokenService.exists(token);
        if (isToken) {
            UserOperationLogEntity log = new UserOperationLogEntity();
            log.setIpAddress(ip);
            log.setRequestUri(uri);
            log.setRequestMethod(request.getMethod());
            log.setUserAgent(request.getHeader("User-Agent"));
            log.setActionModule("用户核心");
            log.setActionType("登录");
            log.setRequestParam(null);
            log.setCreateTime(LocalDateTime.now());
            UserEntity user = userTokenService.getUserByToken(token);
            log.setUserId(user.getId());
            log.setUserAccount(user.getUsername());
            log.setResultStatus("成功");
            log.setResultMessage("yes");

            userIpAccessService.recordUserIpAccess(log, token);
            CookieUtil.setLoginCookies(response, token, user.getId());
            return ResponseResult.success("yes");
        } else {
            return ResponseResult.success("no");
        }
    }

    @PostMapping("/register")
    @Operation(summary = "用户注册")
    public ResponseResult<?> register(@RequestBody UserRegisterDTO dto, HttpServletRequest request, HttpServletResponse response) {
        String ip = IpUtil.getIp(request);

        if (dto.getType() == null) {
            dto.setType(2L);
        }
        if (dto.getRole() == null || (!Objects.equals(dto.getRole(), 2L) && !Objects.equals(dto.getRole(), 4L))) {
            return ResponseResult.fail("仅支持学生或班长/班主任注册");
        }

        Map<String, Object> registerResult = model.register(dto, ip);
        boolean ok = Boolean.TRUE.equals(registerResult.get("ok"));
        if (!ok) {
            return ResponseResult.fail((String) registerResult.get("message"));
        }

        UserEntity user = (UserEntity) registerResult.get("user");
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("status", user.getStatus());

        String token = JwtUtil.generateToken(claims);
        userTokenService.existsDelete(user.getId());
        userTokenService.saveToken(token, user);
        CookieUtil.setLoginCookies(response, token, dto.getType());

        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("nickname", user.getNickname());
        userData.put("role", Objects.equals(dto.getRole(), 4L) ? "monitor" : "student");
        data.put("user", userData);
        return ResponseResult.success(data);
    }

    @PostMapping("/login")
    @Operation(summary = "用户登录")
    public ResponseResult<?> login(@RequestBody UserLoginDTO dto, HttpServletResponse response, HttpServletRequest request) {
        String ip = IpUtil.getIp(request);
        String uri = request.getRequestURI();

        UserLoginVO vo = model.login(dto, ip);
        UserEntity user = vo.getUser();

        UserOperationLogEntity log = new UserOperationLogEntity();
        log.setIpAddress(ip);
        log.setRequestUri(uri);
        log.setRequestMethod(request.getMethod());
        log.setUserAgent(request.getHeader("User-Agent"));
        log.setActionModule("system/auth-app");
        log.setActionType("登录");
        log.setRequestParam(null);
        log.setCreateTime(LocalDateTime.now());

        if (vo.getToken() == null) {
            log.setUserId(null);
            log.setUserAccount(null);
            log.setResultStatus("失败");
            log.setResultMessage(vo.getStatus());
            userIpAccessService.recordUserIpAccess(log, null);
            return ResponseResult.fail(vo.getStatus());
        } else {
            log.setUserId(user.getId());
            log.setUserAccount(user.getUsername());
            log.setResultStatus("成功");
            log.setResultMessage(vo.getToken());

            userTokenService.existsDelete(user.getId());
            userIpAccessService.recordUserIpAccess(log, vo.getToken());
            userTokenService.saveToken(vo.getToken(), user);
            CookieUtil.setLoginCookies(response, vo.getToken(), dto.getType());

            UserToRoleEntity roleEntity = userToRoleRepository.selectOne(
                    Wrappers.lambdaQuery(UserToRoleEntity.class)
                            .eq(UserToRoleEntity::getUserId, user.getId())
                            .last("limit 1")
            );

            Map<String, Object> result = new HashMap<>();
            result.put("message", "登录成功");
            result.put("token", vo.getToken());

            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("nickname", user.getNickname());
            userData.put("role", roleEntity != null && Objects.equals(roleEntity.getRoleId(), 4L) ? "monitor" : "student");
            result.put("user", userData);
            return ResponseResult.success(result);
        }
    }

    @GetMapping("/logout")
    @UserLog(module = "system/auth-app", action = "用户退出登录")
    @Operation(summary = "用户退出登录")
    public ResponseResult<String> logout(HttpServletResponse response, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (token == null || token.isEmpty()) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("token".equals(c.getName())) {
                        token = c.getValue();
                        break;
                    }
                }
            }
        }

        if (token == null) {
            return ResponseResult.fail("token不存在");
        } else {
            userTokenService.removeToken(token);
            CookieUtil.clearLoginCookies(response);
            return ResponseResult.success("退出登录成功");
        }
    }

    @PostMapping("/change")
    @UserLog(module = "用户核心", action = "用户修改密码和安全密码")
    @Operation(summary = "用户修改密码和安全密码")
    public ResponseResult<String> change(@RequestBody UserChangeDto dto) {
        UserEntity user = UserTokenContextHolder.get();
        if (user == null) {
            return ResponseResult.fail("用户不存在");
        }

        if (dto.getNewPassword() == null || dto.getNewPassword().isEmpty()) {
            return ResponseResult.fail("未知新密码");
        }

        if (dto.getOldPassword() == null || dto.getNewPassword().isEmpty()) {
            return ResponseResult.fail("未知旧密码");
        }

        if (dto.getType() == null) {
            return ResponseResult.fail("未知修改类型");
        }

        if (dto.getType() == 1) {
            if (!dto.getOldPassword().equals(user.getPassword())) {
                return ResponseResult.fail("旧密码错误");
            } else {
                user.setPassword(dto.getNewPassword());
                userRepository.updateById(user);
            }
        } else {
            if (!dto.getOldPassword().equals(user.getSecurePassword())) {
                return ResponseResult.fail("旧密码错误");
            } else {
                user.setSecurePassword(dto.getNewPassword());
                userRepository.updateById(user);
            }
        }

        return ResponseResult.success("修改密码成功");
    }

    @GetMapping("/seal")
    @AdminLog(module = "FANS_用户信息", action = "封禁用户")
    @Operation(summary = "封禁用户")
    public ResponseResult<?> sealSystemUser(@RequestParam Long id) {
        UserEntity user = userRepository.selectById(id);

        if (user == null) {
            return ResponseResult.fail("没有找到用户 ");
        }

        if (user.getStatus() == 1) {
            user.setStatus(0);
            user.setUpdateTime(LocalDateTime.now());
            userRepository.updateById(user);
            return ResponseResult.success("封禁用户成功，强制下线并且停止其任务");
        } else {
            user.setStatus(1);
            user.setUpdateTime(LocalDateTime.now());
            userRepository.updateById(user);
            return ResponseResult.success("用户已经解除封禁");
        }
    }
}
