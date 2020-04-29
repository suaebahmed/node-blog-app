const Profile = require('../../models/profile-model');

exports.BookmarksController = async (req,res,next)=>{
    let { postId } = req.params

    if(!req.user){
        return res.status(403).json({
            error: 'Unauthorization'
        });
    }
    let userId = req.user._id;
    let bookmark = null

    try {
        
        let profile = await Profile.findById(userId)

        if(profile.bookmarks.includes(postId)){
            await Profile.findByIdAndUpdate(
                {_id: postId},
                {$pull: {
                    bookmarks: postId
                }}
            )
            bookmark = false;
        }else{
            await Profile.findByIdAndUpdate(
                {_id: postId},
                {$push: {
                    bookmarks: postId
                }}
            )
            bookmark = true
        }
        res.status(200).json({
            bookmark: bookmark  // to generate front-end;
        })

    } catch (error) {
        console.log(e)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}
