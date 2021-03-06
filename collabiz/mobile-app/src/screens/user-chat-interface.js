import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Fire from '../../Fire';

type Props = {
  name?: string,
};

class GotoUserChat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: (route.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.route.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default GotoUserChat;