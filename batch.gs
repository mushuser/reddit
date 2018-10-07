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
  redditlib.batch_del_old_comments()
  updaterlib.batch_update_doc()
}

function batch_hours12() {
  console.info("batch_hours12()")  
  redditlib.batch_save_wikis_gd() // the longest task at the last
}


function batch_hours2() {
  console.info("batch_hours2()")
  redditlib.batch_add_goodposts()
}

// 10m
function batch_comments_snapshot() {
  var checkeds = redditlib.get_checked_comments_pro()
  var names = redditlib.get_new_comment_names()
  
  if(names.length > 0) {
    console.info("batch_comments_snapshot() in")
  }
  
  for(var i=0; i<names.length; i++) {
    var parent_full = redditlib.get_parent_full(names[i])
    var title = redditlib.get_parent_data(parent_full).title
    
    var doc = {
      name:names[i],
      data:parent_full
    }
    mlablib.insert_documents("snapshot", doc) 
    console.log("new snapshot inserted:%s:%s", names[i], title)
  }
  
  if(names.length > 0) {  
    console.info("batch_comments_snapshot() out")  
  }
}