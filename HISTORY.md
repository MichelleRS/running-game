# History

## Repository Creation

This document outlines the steps taken to create a new repository from a directory (`running-game`) of an existing repository (`javascript-practice`), preserving its commit history. This process is useful for isolating parts of a project into their own repositories while maintaining the historical context of changes.

### Steps

1. **Create a New Repository on GitHub**

   - Navigate to GitHub and create a new repository. Choose "Private" for its visibility. Do not initialize it with a README, .gitignore, or license.

2. **Filter the `running-game` Directory**

   - Open your terminal.
   - Navigate to the `javascript-practice` repository.
   - Use the `git subtree` command to split the `running-game` directory into a new branch. This command creates a new branch (`running-game-branch`) containing the history of the `running-game` directory.
     ```
     git subtree split -P running-game -b running-game-branch
     ```

3. **Clone the New Repository**

   - Clone the newly created repository to your local machine. Replace `your-username` and `new-repo-name` with your GitHub username and the new repository name.
     ```
     git clone https://github.com/your-username/new-repo-name.git
     cd new-repo-name
     ```

4. **Pull the Filtered Branch into the New Repository**

   - From within the newly cloned repository, pull the `running-game-branch` from the original repository. Replace `/path/to/javascript-practice` with the actual path to your original repository.
     ```
     git pull /path/to/javascript-practice running-game-branch
     ```

5. **Push to GitHub**

   - Push the changes to the remote repository on GitHub.
     ```
     git push origin main
     ```

6. **Set Remote Repository URL**
   - Update the remote repository URL to point to the new GitHub repository.
     ```
     git remote set-url origin https://github.com/your-username/new-repo-name.git
     ```

### Verification

- Verify that the new repository contains the `running-game` directory with its commit history preserved by running `git log`.
