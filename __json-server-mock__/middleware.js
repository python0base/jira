/*
 * @Descripttion: json-server中间件
 * @Author: huangjitao
 * @Date: 2021-04-12 21:16:42
 * @Function: use of this file
 */

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};