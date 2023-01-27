import { tweetsData } from `./data.js`
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", function(e){
    if(e.target.dataset.heart){
        targetLikes(e.target.dataset.heart)
    }
    else if(e.target.dataset.retweet){
        targetRetweet(e.target.dataset.retweet)
    } else if(e.target.dataset.reply){
        targetReply(e.target.dataset.reply)
    } else if(e.target.id === "tweet-btn"){
        btnClick()
    }
})

function targetLikes(tweetsId){
    const likesTweet = tweetsData.filter(function(tweets){
        return tweetsId === tweets.uuid
    })[0]
    
    if(likesTweet.isLiked){
        likesTweet.likes--
    }else{
        likesTweet.likes++
    }
    
    likesTweet.isLiked = !likesTweet.isLiked
    render()
}

function targetRetweet(tweetsId){
    const retweet = tweetsData.filter(function(tweet){
        return tweetsId === tweet.uuid
    })[0]
    
    if(retweet.isRetweeted){
        retweet.retweets--
    }else{
        retweet.retweets++
    }
    retweet.isRetweeted = !retweet.isRetweeted
    render()
}

function targetReply(tweetsId){
    document.getElementById(`replies-${tweetsId}`).classList.toggle(`hidden`)
}

function btnClick(){
    const textArea = document.getElementById("text-area")
    
    if(textArea.value){
        tweetsData.unshift({
                handle: `@Gracecop✅`,
                profilePic: `images/h.jpg`,
                likes: 0,
                retweets: 0,
                tweetText: textArea.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4(),
            })
    render()
    textArea.value = ``
    }

}

function tweetsProperties(){
    let tweetsItem = ``

    tweetsData.forEach(function(tweets){
        
    let likedClass = ``    
        if(tweets.isLiked){
            likedClass = `liked`
        }
        
    let retweetClass = ``
        if(tweets.isRetweeted){
            retweetClass = `retweet`
        }
        
         let reply = ``
        if(tweets.replies.length > 0){
        tweets.replies.forEach(function(tweet){
            reply += `
            <div class="reply">
                <div class="personal">
                    <img src="${tweet.profilePic}" class="profile-pic"/>
                    <div class="profile">
                        <p class="handle">${tweet.handle}</p>
                        <p>${tweet.tweetText}</p>
                    </div>  
                </div>
            </div>  
            `
    }) 
    }
        
        tweetsItem += `
        <div>
            <div class="personal">
                <img src="${tweets.profilePic}" class="profile-pic"/>
                <div class="profile">
                    <p class="handle">${tweets.handle}</p>
                    <p>${tweets.tweetText}</p>
                </div>
            </div>
            <div class="icons-num">
                <span class="icons">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweets.uuid}"></i>
                    ${tweets.replies.length}    
                </span>
                <span class="icons">
                    <i class="fa-solid fa-heart ${likedClass}" data-heart="${tweets.uuid}"></i>
                    ${tweets.likes}
                </span>
                <span class="icons">
                    <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweets.uuid}"></i>
                    ${tweets.retweets}
                </span>
            </div>
            <div class="hidden" id="replies-${tweets.uuid}">
                ${reply}
            </div>
        </div>
`
    })
    
   return tweetsItem
}


function render(){
    document.getElementById(`feed`).innerHTML =  tweetsProperties()
}
render()