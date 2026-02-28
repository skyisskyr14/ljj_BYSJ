-- ljj 项目数据库变更（新建业务库和业务表）
CREATE DATABASE IF NOT EXISTS ljj DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE ljj;

-- 用户扩展信息表（与 sq_system.user 通过 sys_user_id 关联）
CREATE TABLE IF NOT EXISTS ljj_user_profile (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  sys_user_id BIGINT NOT NULL COMMENT '系统用户ID（关联 sq_system.user.id）',
  identity_type TINYINT NOT NULL COMMENT '身份类型：1学生 2班长/班主任 3管理员',
  real_name VARCHAR(64) NULL COMMENT '真实姓名',
  student_no VARCHAR(64) NULL COMMENT '学号/工号',
  avatar VARCHAR(255) NULL COMMENT '头像地址',
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_sys_user_id (sys_user_id),
  KEY idx_identity_type (identity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='同学录用户扩展信息表';

-- 班级主表
CREATE TABLE IF NOT EXISTS ljj_class (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT '班级ID',
  class_code VARCHAR(64) NOT NULL COMMENT '班级邀请码/编号',
  class_name VARCHAR(128) NOT NULL COMMENT '班级名称',
  school_name VARCHAR(128) NULL COMMENT '学校名称',
  grade_name VARCHAR(64) NULL COMMENT '年级',
  monitor_sys_user_id BIGINT NULL COMMENT '班长系统用户ID',
  teacher_sys_user_id BIGINT NULL COMMENT '班主任系统用户ID',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1有效 0停用',
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_class_code (class_code),
  KEY idx_monitor_user (monitor_sys_user_id),
  KEY idx_teacher_user (teacher_sys_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='同学录班级表';

-- 班级成员表
CREATE TABLE IF NOT EXISTS ljj_class_member (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  class_id BIGINT NOT NULL COMMENT '班级ID',
  sys_user_id BIGINT NOT NULL COMMENT '系统用户ID',
  member_role TINYINT NOT NULL DEFAULT 1 COMMENT '成员角色：1学生 2班长 3班主任',
  join_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1在班 0退出',
  PRIMARY KEY (id),
  UNIQUE KEY uk_class_user (class_id, sys_user_id),
  KEY idx_sys_user (sys_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='同学录班级成员关系表';
