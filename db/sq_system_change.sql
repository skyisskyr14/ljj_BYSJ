-- sq_system 变更（仅数据记录变更，不改动既有表结构）
USE sq_system;

-- 1) 新增本项目标识
INSERT INTO system_project (id, project_code, project_name, description, create_time)
VALUES (2, 'ljj', '云同学录系统', '毕业设计项目：学生班级同学录', NOW())
ON DUPLICATE KEY UPDATE
  project_code = VALUES(project_code),
  project_name = VALUES(project_name),
  description = VALUES(description);

-- 2) 新增用户角色：班长/班主任
INSERT INTO user_role (id, role_code, role_name, description)
VALUES (4, 'monitor_teacher', '班长/班主任', '同学录班级管理角色')
ON DUPLICATE KEY UPDATE
  role_code = VALUES(role_code),
  role_name = VALUES(role_name),
  description = VALUES(description);

-- 3) 把管理员映射到 ljj 项目（用于 /auth/admin/login projectCode=ljj）
INSERT INTO admin_project (admin_id, project_id)
SELECT a.id, 2
FROM admin a
WHERE NOT EXISTS (
  SELECT 1 FROM admin_project ap WHERE ap.admin_id = a.id AND ap.project_id = 2
);
