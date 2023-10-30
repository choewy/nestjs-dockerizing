export enum NodeEnv {
  Local = 'local',
  Develop = 'develop',
  Production = 'production',
}

export enum ThrottlerName {
  S10 = '10s',
  S30 = '30s',
  S60 = '60s',
}

export enum ThrottlerTtl {
  S10 = 10000,
  S30 = 30000,
  S60 = 60000,
}

export enum ThrottlerLimit {
  S10 = 10,
  S30 = 60,
  S60 = 120,
}

export enum MongoConnectionName {
  Logs = 'logs',
}

export enum MySqlConnectionName {
  Writer = 'default',
  Reader = 'reader',
}

export enum MetadataKey {
  SkipSaveLog = 'skip-save-log',
}
