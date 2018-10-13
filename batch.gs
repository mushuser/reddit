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


function batch_day1() {
  console.info("batch_day1()")
  redditlib.batch_del_old_comments()
}


function batch_day2() {
  console.info("batch_day2()")
  updaterlib.batch_update_doc()
}


function batch_hours12() {
  console.log("batch_hours12()")  
  redditlib.batch_save_wikis_gd() // the longest task at the last
}


function batch_hours2() {
  console.info("batch_hours2()")
  redditlib.batch_add_goodposts()
}

// 15m
function batch_comments_snapshot() {
  var new_comments = redditlib.get_comments(20)
  var new_c_names = redditlib.get_names_fr_obj(new_comments)
  
  for(var i=0; i<new_c_names.length; i++) {
    var count = mlablib.get_matched_count("snapshot", new_c_names[i])
    if(count > 0) {
      continue  
    }
    
    var parent_full = redditlib.get_parent_full(new_c_names[i])
    var title = redditlib.get_parent_data(parent_full).title
    
    var doc = {
      name:new_c_names[i],
      data:parent_full
    }
    
    var r = mlablib.insert_documents("snapshot", doc) 
    
    if(r) {
      console.log("new snapshot inserted:%s:%s:%s", new_c_names[i], title, parent_full)
    } else {
      console.log("snapshot not inserted:%s:%s:%s", new_c_names[i], title, parent_full) 
    }   
  }
}