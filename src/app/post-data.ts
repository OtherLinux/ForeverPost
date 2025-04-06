export interface PostData {
  id:number,
  creationDate:Date,
  displayName: string,
  message: string,
  nsfw: boolean,
}

export interface PostDataDTO {
  id:number,
  display_name:string,
  message:string,
  nsfw:number,
  created_at:number,
  highest_id:number,
}
