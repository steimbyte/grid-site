export class LoginScreen {
	static render(): string {
		return `
      <div class="login-bg">
      </div>
      
      <div class="login-form-card" id="login-card">
        <div class="card-glow" id="card-glow"></div>
        <div class="form-inner">
          <div class="form-logo">
            <i data-lucide="layout-grid"></i>
          </div>
          
          <h2>Welcome to Grid-View</h2>
          
          <div class="field">
            <input 
              type="text" 
              id="login-username" 
              placeholder="Username"
              autocomplete="username"
            >
          </div>
          
          <div class="field">
            <input 
              type="password" 
              id="login-password" 
              placeholder="Password"
              autocomplete="current-password"
            >
          </div>
          
          <button class="submit-btn" id="btn-login">
            <span class="btn-text">Sign In</span>
            <span class="btn-loader"></span>
          </button>
          
          <div class="login-toggle">
            <span id="toggle-text">New user?</span>
            <button id="btn-toggle">Create account</button>
          </div>
        </div>
      </div>
      
      <div class="login-error" id="login-error"></div>
    `;
	}

	static init(
		onLogin: (
			username: string,
			password: string,
			isRegister: boolean,
		) => Promise<void>,
	): void {
		const usernameInput = document.getElementById(
			"login-username",
		) as HTMLInputElement;
		const passwordInput = document.getElementById(
			"login-password",
		) as HTMLInputElement;
		const loginBtn = document.getElementById("btn-login") as HTMLButtonElement;
		const btnText = loginBtn.querySelector(".btn-text") as HTMLElement;
		const toggleBtn = document.getElementById(
			"btn-toggle",
		) as HTMLButtonElement;
		const toggleText = document.getElementById("toggle-text") as HTMLElement;
		const errorEl = document.getElementById("login-error") as HTMLElement;
		const card = document.getElementById("login-card");
		const glow = document.getElementById("card-glow");

		let isRegister = false;

		// Mouse glow effect
		card?.addEventListener("mousemove", (e) => {
			if (!card || !glow) return;
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--glow) 0%, transparent 50%)`;
			glow.style.opacity = "1";
		});

		card?.addEventListener("mouseleave", () => {
			if (glow) glow.style.opacity = "0";
		});

		const toggleMode = () => {
			isRegister = !isRegister;
			if (isRegister) {
				btnText.textContent = "Create Account";
				toggleText.textContent = "Have an account?";
				toggleBtn.textContent = "Sign in";
			} else {
				btnText.textContent = "Sign In";
				toggleText.textContent = "New user?";
				toggleBtn.textContent = "Create account";
			}
			errorEl.classList.remove("show");
		};

		const doLogin = async () => {
			const username = usernameInput.value.trim();
			const password = passwordInput.value;

			if (!username) {
				usernameInput.classList.add("shake");
				errorEl.textContent = "Enter username";
				errorEl.classList.add("show");
				setTimeout(() => usernameInput.classList.remove("shake"), 400);
				return;
			}

			if (!password) {
				passwordInput.classList.add("shake");
				errorEl.textContent = "Enter password";
				errorEl.classList.add("show");
				setTimeout(() => passwordInput.classList.remove("shake"), 400);
				return;
			}

			loginBtn.classList.add("loading");
			loginBtn.disabled = true;
			errorEl.classList.remove("show");

			try {
				await onLogin(username, password, isRegister);
			} catch (err) {
				errorEl.textContent =
					err instanceof Error ? err.message : "Something went wrong";
				errorEl.classList.add("show");
				loginBtn.classList.remove("loading");
				loginBtn.disabled = false;
			}
		};

		loginBtn?.addEventListener("click", doLogin);
		toggleBtn?.addEventListener("click", toggleMode);

		passwordInput?.addEventListener("keydown", (e) => {
			if (e.key === "Enter") doLogin();
		});

		usernameInput?.addEventListener("input", () => {
			errorEl.classList.remove("show");
		});

		setTimeout(() => usernameInput?.focus(), 100);
	}
}
