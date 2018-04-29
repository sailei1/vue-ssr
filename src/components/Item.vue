<template>
  <li class="news-item">
    <span class="title">
      <a :href="item.originalUrl" target="_blank" rel="noopener">{{ item.title }}</a>
    </span>
    <br>
    <span class="meta">
      <span>
        {{item.collectionCount}}收藏 | {{item.commentsCount}}评论
      </span>
    </span>
    <p>{{item.content}}</p>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="scss" scoped>
  .news-item {
    background-color: #fff;
    padding: 20px 30px 20px;
    border-bottom: 1px solid #eee;
    position: relative;
    line-height: 20px;
  }

  .news-item .title {
    font-weight: 700;
  }

  .news-item .meta,
  .news-item .host {
    font-size: 0.85em;
    color: #828282;
  }

  .news-item .meta .tag,
  .news-item .host .tag {
    border: 1px solid #828282;
    border-radius: 2px;
    margin-right: 10px;
  }

  .news-item .meta a,
  .news-item .host a {
    color: #828282;
    text-decoration: underline;
  }

  .news-item .meta a:hover,
  .news-item .host a:hover {
    color: #f60;
  }
</style>
