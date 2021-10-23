import axios from 'axios';

const getFacebookUser = async (accessToken) => {
  const { data } = await axios({
    url: `https://graph.facebook.com/v4.0/me?access_token=${accessToken}&fields=last_name%2Cfirst_name%2Cemail%2Cpicture.width(400).height(400)`,
    method: 'get',
  });

  return data;
};

export { getFacebookUser };
