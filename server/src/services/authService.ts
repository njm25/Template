import { AppDataSource } from "../../data-source.ts";
import { BaseService } from "../core/baseService.ts";
import { User } from "../entities/User.ts";
import { compare, hash } from "bcrypt-ts";
import SystemMessage from "../core/systemMessage.ts";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export class AuthService extends BaseService {

	private static boolPassportConfigured: boolean = false;

    protected registerRoutes(): void {
        AuthService.configurePassportOnce();

        this.app.post("/auth/register", async (req, res) => {
            const { email, username, displayName, bio, password } = req.body ?? {};
            res.json((await this.register({ email, username, displayName, bio, password })).toJson());
        });
        this.app.post("/auth/login", async (req, res, next) => {
            await this.login(req, res, next);
        });
        this.app.post("/auth/logout", async (req, res, next) => {
            await this.logout(req, res, next);
        });
        this.app.get("/auth/me", async (req, res, next) => {
            await this.me(req, res, next);
        });
    }

    //#region Register
    private async register({ email, username, displayName, bio, password }: 
        { email: string, username: string, displayName: string, bio: string, password: string })
        : Promise<SystemMessage> {

        const emailMessage = AuthService.validateEmail(email);
        if (emailMessage) {
            return SystemMessage.error(emailMessage);
        }

        const usernameMessage = AuthService.validateUsername(username);
        if (usernameMessage) {
            return SystemMessage.error(usernameMessage);
        }

        const displayNameMessage = AuthService.validateDisplayName(displayName);
        if (displayNameMessage) {
            return SystemMessage.error(displayNameMessage);
        }

        const bioMessage = AuthService.validateBio(bio);
        if (bioMessage) {
            return SystemMessage.error(bioMessage);
        }

        const passwordMessage = AuthService.validatePassword(password);
        if (passwordMessage) {
            return SystemMessage.error(passwordMessage);
        }
        
        const passwordHash = await hash(password, 10);

        const repo = AppDataSource.getRepository(User);

        const user = repo.create({
            email,
            username,
            displayName,
            bio,
            passwordHash
        });
        
        await repo.save(user);

        return SystemMessage.success("User registered successfully");
    }
    //#endregion Register

    //#region Login
    private async login(req: any, res: any, next: any): Promise<void> {
        try {
            const user = await new Promise<User>((resolve, reject) => {
                passport.authenticate("local", (err: any, user: User | false, info: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!user) {
                        return reject(info?.message ?? "Invalid email or password");
                    }
                    resolve(user);
                })(req, res, next);
            });
    
            await new Promise<void>((resolve, reject) => {
                req.login(user, (err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            res.json(SystemMessage.success("Login successful").toJson());
        } catch (err: any) {
            res.json(SystemMessage.error(
                typeof err === "string" ? err : "Login failed"
            ).toJson());
        }
    }
    //#endregion Login
    
    //#region Logout
    private async logout(req: any, res: any, next: any): Promise<void> {
        try {
            await new Promise<void>((resolve, reject) => {
                req.logout((err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            if (req.session) {
                await new Promise<void>((resolve, reject) => {
                    req.session.destroy((err: any) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });
            }
    
            res.json(SystemMessage.success("Logout successful").toJson());
        } catch {
            res.json(SystemMessage.error("Logout failed").toJson());
        }
    }
    //#endregion Logout

    //#region Me
    private async me(req: any, res: any, next: any): Promise<void> {
        try {
            if (!req.isAuthenticated?.() || !req.user) {
                res.json(SystemMessage.error("Not authenticated").toJson());
                return;
            }
    
            const user = req.user as User;
    
            res.json(SystemMessage.success("Me successful", {
                id: user.id,
                email: user.email,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio
            }).toJson());
        }
        catch {
            res.json(SystemMessage.error("Me failed").toJson());
        }
    }
    
    //#endregion Me

    //#region Validation
    public static validateEmail(email: string): string | null {
        // regex email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Invalid email address";
        }
        return null;
    }

    public static validateUsername(username: string): string | null {
        if (username.length < 3 || username.length > 25) {
            return "Username must be between 3 and 25 characters.";
        }
        // regex exclude all special characters except underscore
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return "Username can only contain letters and numbers.";
        }
        if (username.startsWith("_") || username.endsWith("_")) {
            return "Username cannot start or end with an underscore.";
        }
        return null;
    }


    public static validateDisplayName(displayName: string): string | null {
        if (displayName.length < 3 || displayName.length > 25) {
            return "Display name must be between 3 and 25 characters";
        }
        return null;
    }

    public static validateBio(bio: string): string | null {
        if (bio.length > 255) {
            return "Bio must be less than 255 characters";
        }
        return null;
    }

    public static validatePassword(password: string): string | null {
        if (password.length < 8 || password.length > 25) {
            return "Password must be between 8 and 25 characters";
        }

        // regex password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        return null;
    }

    //#endregion Validation

    //#region Passport
	private static configurePassportOnce(): void {
		if (AuthService.boolPassportConfigured) {
			return;
		}
		AuthService.boolPassportConfigured = true;

		passport.use(new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				session: true
			},
			async (email, password, done) => {
				try {
					if (!email || !password) {
						return done(null, false, { message: "Invalid email or password" });
					}

					const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
					if (!user) {
						return done(null, false, { message: "Invalid email or password" });
					}

					const ok = await compare(password, user.passwordHash);
					if (!ok) {
						return done(null, false, { message: "Invalid email or password" });
					}

					return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		));

		passport.serializeUser((user: any, done) => {
			// Store the minimum possible in session: user id
			done(null, user.id);
		});

		passport.deserializeUser(async (id: any, done) => {
			try {
				const user = await AppDataSource.getRepository(User).findOne({ where: { id: Number(id) } });
				if (!user) {
					return done(null, false);
				}

				// You can also strip fields here if you want req.user to be "safe"
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		});
	}
    //#endregion Passport

}