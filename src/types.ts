export interface Configuration {
  endpoint: string,
  region: string,
  accessKeyId: string,
  secretAccessKey: string
}

export interface Record {
  data: any,
  key: string
}
