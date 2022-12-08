/*
 * @Author: djw
 * @Description: 文章相关数据传送模型
 */
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