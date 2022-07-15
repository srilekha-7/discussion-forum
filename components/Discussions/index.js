import { Component } from "react";
import { v4 } from "uuid";

import DiscussionItems from "../DiscussionItems";

import "./index.css";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

class Discussions extends Component {
  state = {
    nameInput: "",
    discussionInput: "",
    discussionList: [],
  };

  deleteDiscussion = (discussionId) => {
    const { discussionList } = this.state;

    this.setState({
      discussionList: discussionList.filter(
        (discussion) => discussion.id !== discussionId
      ),
    });
  };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      discussionList: prevState.discussionList.map((eachDiscussion) => {
        if (id === eachDiscussion.id) {
          return { ...eachDiscussion, isLiked: !eachDiscussion.isLiked };
        }
        return eachDiscussion;
      }),
    }));
  };

  renderDiscussionList = () => {
    const { discussionList } = this.state;

    return discussionList.map((eachDiscussion) => (
      <DiscussionItems
        key={eachDiscussion.id}
        discussionDetails={eachDiscussion}
        toggleIsLiked={this.toggleIsLiked}
        deleteDiscussion={this.deleteDiscussion}
      />
    ));
  };

  onAddDiscussion = (event) => {
    event.preventDefault();
    const { nameInput, discussionInput } = this.state;
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1
        )
      ]
    }`;
    const newDiscussion = {
      id: v4(),
      name: nameInput,
      discussion: discussionInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    };

    this.setState((prevState) => ({
      discussionList: [...prevState.discussionList, newDiscussion],
      nameInput: "",
      discussionInput: "",
    }));
  };

  onChangeDiscussionInput = (event) => {
    this.setState({
      discussionInput: event.target.value,
    });
  };

  onChangeNameInput = (event) => {
    this.setState({
      nameInput: event.target.value,
    });
  };

  render() {
    const { nameInput, discussionInput, discussionList } = this.state;

    return (
      <div className="app-container">
        <div className="discussions-container">
          <h1 className="app-heading">Discussions</h1>
          <div className="discussions-inputs">
            <form className="form" onSubmit={this.onAddDiscussion}>
              <p className="form-description">
                Say something about web development Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Discussion"
                className="discussion-input"
                value={discussionInput}
                onChange={this.onChangeDiscussionInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Discussion
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="discussions"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="discussions-count">{discussionList.length}</span>
            Discussions
          </p>
          <ul className="discussions-list">{this.renderDiscussionList()}</ul>
        </div>
      </div>
    );
  }
}

export default Discussions;
