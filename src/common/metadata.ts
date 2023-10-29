import { SetMetadata } from '@nestjs/common';

import { MetadataKey } from './enums';

export const SkipSaveLog = () => SetMetadata(MetadataKey.SkipSaveLog, true);
