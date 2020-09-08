import fs from 'fs-extra';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngtran from 'imagemin-pngquant';
import path from 'path';

export default class OptimizeService {
  async compress(srcPath: string, mime?: string): Promise<string> {
    const fileType = this.getFileType(srcPath, mime);
    if (!fileType) return srcPath;
    if (fileType === FileType.Jpeg || fileType === FileType.Png) {
      const fileId = srcPath.replace(/.+[\/]/g, '');
      const fileServicePath = path.resolve('/tmp/file-service', fileId);
      await fs.mkdirs(fileServicePath);
      const fileName = `${fileId}.${fileType}`;
      await fs.copyFile(srcPath, path.resolve(fileServicePath, fileName));
      const result = await imagemin([`${fileServicePath}/**/*`], {
        destination: '/tmp/compressed',
        plugins: [
          imageminJpegtran(),
          imageminPngtran({
            quality: [0.6, 0.8]
          })
        ]
      });
      return result[0].destinationPath;
    }
    return srcPath;
  }

  getFileType(srcPath: string, mime?: string): FileType | null {
    if (mime === 'image/png') return FileType.Png;
    if (mime === 'image/jpeg') return FileType.Jpeg;
    if (/.png$/.test(srcPath)) return FileType.Png;
    if (/.jpe?g$/.test(srcPath)) return FileType.Jpeg;
    return null;
  }
}

export enum FileType {
  Jpeg = 'jpeg',
  Png = 'png'
}
