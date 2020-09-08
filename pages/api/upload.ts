import fs from 'fs-extra';
import { IncomingForm, Fields, Files, File } from 'formidable';
import { Request, Response } from 'express';
import OptimizeService from '../../services/optimize';
import globalConfig from '../config';

const optimizeService = new OptimizeService();

const handler = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    return res.send();
  }
  const form = new IncomingForm();
  const file = await new Promise<File>((resolve, reject) => {
    form.parse(req, (err, _fields: Fields, { file }: Files) => {
      if (err) return reject(err);
      return resolve(file);
    });
  });
  if (file.size > globalConfig.maxUploadSize) {
    res.statusCode = 400;
    return res.json({
      maxUploadsize: globalConfig.maxUploadSize,
      message: `file contains ${file.size} bytes which is larger than the maximum upload file size of ${globalConfig.maxUploadSize} bytes`,
      size: file.size
    });
  }
  const fileBuffer = await fs.readFile(file.path);
  res.statusCode = 200;
  return res.json({
    ...Object.entries(file).reduce((meta: any, [key, value]: [string, any]) => {
      if (key[0] !== '_') meta[key] = value;
      return meta;
    }, {}),
    data: fileBuffer.toString('base64'),
    path: await optimizeService.compress(file.path, file.type)
  });
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
