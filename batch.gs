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


function batch_hour() {
  console.info("batch_hour()")
  var comments = redditlib.get_comments()
  var len = comments.length
  var m = 1000
  var left = len % m
  var c = Math.ceil(len / m)
  
  for(var i=0; i<c;i++) {
    var parts = comments.slice(i*m, i*m+m)
    console.log("batch %d", i)
    mlablib.insert_documents(parts)    
  }
  
  // 999 docs 3.7M 
  // 500M / 3.7M = 135
  // 135H / 24H = 5.6D(CAPPED)
}