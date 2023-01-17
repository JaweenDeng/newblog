/*
 * @Author: djw
 * @Description: 文章相关数据传送模型
 */

// 新建文章
export class CreateArticleDTO {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly type: number;
  readonly content: string;
  readonly poster?: string;
  readonly sort: number;
  readonly status: number
}

// 文章分页查询
export class ListArticleDTO {
  readonly page:number;
  readonly pageSize?:number;
  readonly type?: number;
}

// 新建文件评论
export class CreateCommentDTO {
  readonly content: String
  readonly parentId?:String
  readonly articleId:String
}

export class statusDTO {
  readonly id: Number
  readonly status:Number
  readonly parentId:Number
}