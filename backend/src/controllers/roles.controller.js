const rolesCtrl = {};
const Role = require('../models/Role');

rolesCtrl.createRole = async (req, res) => {
    const { rolename, description } = req.body;
    const newRole = new Role({
        rolename,
        description
    });
    await newRole.save();
    res.json({ message: "Role created!"});
}

rolesCtrl.updateRole = async (req, res) => {
    const id = req.params.id;
    const { rolename, description } = req.body;
    await Role.findByIdAndUpdate(id, {
        rolename,
        description
    });
    res.json({ message: "Role updated!"});
}

rolesCtrl.deleteRole = async (req, res) => {
    const id = req.params.id;
    await Role.findByIdAndDelete(id);
    res.json({ message: "Role deleted!" });
}

rolesCtrl.getRoles = async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
}

rolesCtrl.getOneRole = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findById(id);
    res.json(role);
}

module.exports = rolesCtrl;