CREATE TABLE users_v2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  telephone VARCHAR(255) UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE photos_v2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  photo_path VARCHAR(255) NOT NULL,
  caption TEXT,
  status VARCHAR(255) DEFAULT 'pending', -- pending, approved, rejected, deleted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users_v2(id)
);
CREATE TABLE messages_v2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  content TEXT,
  status VARCHAR(255) DEFAULT 'pending', -- pending, approved, rejected, deleted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users_v2(id)
);
