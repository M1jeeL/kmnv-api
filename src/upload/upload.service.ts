import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const mimeType = mime.lookup(fileName);

    if (!mimeType) {
      throw new Error(`Unable to determine MIME type for file ${fileName}`);
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'kmnv-test',
        Key: `images/${fileName}`,
        Body: file,
        ACL: 'public-read',
        Tagging: 'public=yes',
        ContentType: mimeType,
      }),
    );
    const url = `https://kmnv-test.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${fileName}`;
    return { url };
  }
}
