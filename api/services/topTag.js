module.exports = {
  topTagHelper: function(data){
    tagCounts = { topPosts : [] };
     for (i = 0; i < data.length; i++) {
       curPostTags = data[i].tagArray.toString().split(",");
       //console.log(data[i].tagArray.toString().split(","));
       for (j = 0; j < curPostTags.length; j++) {
         //increment tag in tagCount object, or initialize to 1
         if (tagCounts[curPostTags[j]] == undefined) {
           tagCounts[curPostTags[j]] = 1;
         } else {
          tagCounts[curPostTags[j]] = tagCounts[curPostTags[j]] + 1;
         }
         if (tagCounts.topPosts.length < 5) {
           tagCounts.topPosts[tagCounts.topPosts.length] = curPostTags[j];
         } else {
           min = 9999;
           minIndex = -1;
           for (k = 0; k < 5; k++) {
             if (tagCounts[tagCounts.topPosts[k]] < min) {
               minIndex = k;
               min = tagCounts[tagCounts.topPosts[k]];
             }
             if (tagCounts.topPosts[k] == curPostTags[j]) {
               minIndex = -1;
               break;
             }
           }
           if (minIndex != -1) {
             if (tagCounts[tagCounts.topPosts[minIndex]] < tagCounts[curPostTags[j]]) {
                tagCounts.topPosts[minIndex] = curPostTags[j];
             }
           }
         }

       }
       console.log(tagCounts);

     }return tagCounts;
  }


}
