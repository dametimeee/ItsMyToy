export const postJoin = async (req, res) => {
  const { id, password, password2, email, name } = req.body;
  res.send(id, password, password2, email, name);
};
