redditlib.init_project(subreddit, creds, folder_id, flair_mapping)
redditlib.check_init()


updaterlib.init_project(doc_filename, doc_id, doc_wiki, page_header)
updaterlib.check_init()


function batch_month() {
  console.info("batch_month()")
  updaterlib.batch_update_doc_force()
}


function batch_day() {
  console.info("batch_day()")
  redditlib.batch_del_old_comments()
  updaterlib.batch_update_doc()
}


function batch_hours() {
  console.info("batch_hours()")
  redditlib.batch_add_goodposts()
  redditlib.batch_save_comments_gd()
}