import { SetMetadata } from '@nestjs/common';

import { MetadataKey } from '@app-common/enums';

export const SkipSaveLog = () => SetMetadata(MetadataKey.SkipSaveLog, true);
