import { SetMetadata } from '@nestjs/common';

import { MetadataKey } from '@app-common/enums';

export const IgnoreSaveLog = () => SetMetadata(MetadataKey.IgnoreSaveLog, true);
