redditlib.init_project(subreddit, creds, folder_id, flair_mapping)
redditlib.check_init()


updaterlib.init_project(doc_filename, doc_id, doc_wiki, page_header)
updaterlib.check_init()


mlablib.init_project(mlab)
mlablib.check_init()

function batch_month() {
  console.info("batch_month()")
  updaterlib.batch_update_doc_force()
}


function batch_day() {
  console.info("batch_day()")
  redditlib.batch_save_wikis_gd()
  redditlib.batch_del_old_comments()
  updaterlib.batch_update_doc()
}


function batch_hours2() {
  console.info("batch_hours2()")
  redditlib.batch_add_goodposts()
}

// 10m
function batch_comments_snapshot() {
//  console.info("batch_comments_snapshot() in")
  var checkeds = redditlib.get_checked_comments()
  var names = redditlib.get_new_comment_names()
  
  for(var i=0; i<names.length; i++) {
    var parent = redditlib.get_parent_full(names[i])
    mlablib.insert_documents("snapshot", parent) 
    console.log("new snapshot inserted:%s", names[i])
  }
//  console.info("batch_comments_snapshot() out")  
}