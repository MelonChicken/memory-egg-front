export function doesPostLikelySatisfyQuest(post, quest) {
  if (!post || !quest) {
    return false;
  }

  if (quest.status === "claimed") {
    return false;
  }

  const questType = quest.quest_type;
  const postTag = post.tag;
  const requiredTag = quest.required_tag;
  const postWordCount = Number(post.word_count || 0);
  const requiredWordCount = Number(quest.required_word_count || 0);
  const hasImage = Boolean(post.image_url);

  if (questType === "post_tag" || questType === "tag") {
    return postTag === requiredTag;
  }

  if (questType === "word_count") {
    return postWordCount >= requiredWordCount;
  }

  if (questType === "image") {
    return hasImage;
  }

  if (questType === "post_tag_image") {
    return postTag === requiredTag && hasImage;
  }

  if (questType === "post_tag_word_count") {
    return postTag === requiredTag && postWordCount >= requiredWordCount;
  }

  return false;
}