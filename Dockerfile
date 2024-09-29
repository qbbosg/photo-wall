#FROM ccr.ccs.tencentyun.com/dmtg/alpine-node20
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmmirror.com

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 如果您的应用使用了特定的端口，确保将其暴露出来
EXPOSE 3000

# 映射上传文件的目录到宿主机，这里假设宿主机的目录是 ./uploads
VOLUME ["/app/uploads"]

# 容器启动时执行的命令
CMD ["node", "app.js"]