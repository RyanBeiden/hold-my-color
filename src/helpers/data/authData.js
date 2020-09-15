import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;

const getGithubUser = () => firebase.auth().currentUser.providerData[0].providerId;

export default { getUid, getGithubUser };
