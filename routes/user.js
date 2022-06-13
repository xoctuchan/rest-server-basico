const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost, usuariosPatch } = require('../controllers/user');
const { esRolValido,emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos');


router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check ('rol').custom(esRolValido),
    validarCampos
] ,usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido'). isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password es obligatorio ').isLength({min:6}),
            //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check ('rol').custom(esRolValido),
    validarCampos
] ,usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;