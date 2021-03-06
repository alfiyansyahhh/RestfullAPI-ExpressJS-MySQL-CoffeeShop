// hanya menghendel data dari table users
// const db = require('../config/db')

const bcrypt = require('bcrypt');
const usersModel = require('../models/users');
const { success, failed } = require('../helpers/respon');

const users = {
  register: (req, res) => {
    try {
      const { body } = req;
      bcrypt.hash(body.password, 10, (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          failed(res, 401, err); // error handling kurang
        } else {
          usersModel.register(body, hash).then((result) => {
            success(res, result, 'succes');
          }).catch((err1) => {
            failed(res, 401, err1);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      usersModel.cekUsername(body).then((result) => {
        if (result.length <= 0) {
          failed(res, 100, 'username salah'); // responstandar kurang
        } else {
          const passwordHash = result[0].password;
          const passHash = bcrypt.compareSync(body.password, passwordHash);
          if (passHash === true) {
            const message = {
              message: 'Login success',
              token: '123',
            };
            success(res, result, message);
          } else {
            failed(res, result, 'papssword salah');
          }
        }
      }).catch((err1) => {
        failed(res, 401, err1);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : query.limit;
      // eslint-disable-next-line eqeqeq
      const offset = query.page === undefined || query.page == 1 ? 0 : (query.page - 1) * limit;
      usersModel.getList(search, field, typeSort, limit, offset).then(async (result) => {
        // eslint-disable-next-line no-undef
        allData = await usersModel.getAll();
        const output = {
          data: result,
          // eslint-disable-next-line no-undef
          totalPage: Math.ceil(allData.length / limit),
          search,
          limit,
          page: query.page,
        };
        success(res, output, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },

  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      usersModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      usersModel.insert(body).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      usersModel.update(body, id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      usersModel.delete(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = users;
