const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // existing registration logic
  const payload = { user: { id: user.id } };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};

exports.login = async (req, res) => {
  // existing login logic
  const payload = { user: { id: user.id } };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
    if (err) throw err;
    res.json({ token, user: { id: user._id, email: user.email } });
  });
};
