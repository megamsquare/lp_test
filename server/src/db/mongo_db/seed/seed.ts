import { NewRole } from "../../../dto/obj/role.dto";
import { NewUser } from "../../../dto/obj/user.dto";
import Services from "../../../services";

const SeedData = async () => {
  try {
    let userInfo: NewUser = {
      firstName: "User",
      lastName: "Test",
      email: "user@example.com",
      username: "user",
      password: "P@SSw0rd",
    };
    let roleInfo: NewRole;

    // Create User
    const user = await Services.UserService.createUser(userInfo);
    if (user instanceof Error) {
      return;
    }

    if ("_id" in user) {
      const { _id } = user;

      roleInfo = {
        userId: _id,
        role: "admin",
      };
      const role = await Services.RoleService.createRole(roleInfo);
      if (role instanceof Error) {
        console.error(role.message);
      }

      console.log("Seed data created successfully");
      return;
    }
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};

export default SeedData;
