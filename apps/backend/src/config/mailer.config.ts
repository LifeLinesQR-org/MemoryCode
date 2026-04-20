import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { isDev } from '@/libs/common/utils/is-dev.util';

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: configService.getOrThrow<string>('MAIL_LOGIN'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    logger: true,
  },
  defaults: {
    from: `"MemoryCode" ${configService.getOrThrow<string>('MAIL_LOGIN')}`,
  },
});
