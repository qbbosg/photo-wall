const sharp = require('sharp');

const generateThumbnail = async (inputImagePath, outputThumbnailImagePath) => {
    // 读取图片
    const input = sharp(inputImagePath);

    // 获取图片的元数据
    const { width, height } = await input.metadata();

    // 计算缩略图的大小，例如最大宽度为 200px
    const thumbnailWidth = 200;
    const thumbnailHeight = Math.round((height / width) * thumbnailWidth);

    // 生成缩略图
    const thumbnail = await input
        .resize(thumbnailWidth, thumbnailHeight)
        .toBuffer();

    // 保存缩略图
    await sharp(thumbnail)
        .toFile(outputThumbnailImagePath);
}

module.exports = { generateThumbnail };