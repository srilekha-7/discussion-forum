import { formatDistanceToNow } from "date-fns";

import "./index.css";

const DiscussionItems = (props) => {
  const { discussionDetails } = props;
  const { id, name, discussion, isLiked, initialClassName, date } =
    discussionDetails;
  const initial = name ? name[0].toUpperCase() : "";
  const likeTextClassName = isLiked ? "button active" : "button";
  const likeImageUrl = isLiked
    ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
    : "https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png";
  const postedTime = formatDistanceToNow(date);

  const onClickLike = () => {
    const { toggleIsLiked } = props;
    toggleIsLiked(id);
  };

  const onDeleteDiscussion = () => {
    const { deleteDiscussion } = props;
    deleteDiscussion(id);
  };

  return (
    <li className="discussion-item">
      <div className="discussion-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="discussion">{discussion}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteDiscussion}
          testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="discussion-line" />
    </li>
  );
};

export default DiscussionItems;
