import express from "express";
import { z } from "zod";
import { validateParams } from "../../middlewares/validation";
import { getAllUsers, deleteUser, makeAdmin } from "../../controllers/admin";
import { ApiRoutes } from "../../constants";

const router = express.Router();

const AdminParamSchema = z.object({
    userId: z.string().uuid(),
});

router.get(ApiRoutes.ADMIN_GET_USERS, getAllUsers);

router.delete(
    ApiRoutes.ADMIN_DELETE_USER,
    validateParams(AdminParamSchema),
    deleteUser
);

router.get(ApiRoutes.MAKE_ADMIN, validateParams(AdminParamSchema), makeAdmin);

export default router;
