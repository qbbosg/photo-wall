# 使用官方的 Node.js 基础镜像
FROM ccr.ccs.tencentyun.com/dmtg/alpine-node20

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 如果您的应用使用了特定的端口，确保将其暴露出来
EXPOSE 3000

# 映射上传文件的目录到宿主机，这里假设宿主机的目录是 ./uploads
VOLUME ["/usr/src/app/uploads"]

# 容器启动时执行的命令
CMD ["node", "app.js"]