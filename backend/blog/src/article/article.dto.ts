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
  readonly pageSize?:number
}