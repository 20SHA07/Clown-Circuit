#!/bin/bash

# Check if username and token are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <github_username> <personal_access_token>"
    exit 1
fi

USERNAME=$1
TOKEN=$2
REPO_NAME="clown-circuit-silly-ui"
DESCRIPTION="A Silly UI Challenge project featuring intentionally frustrating user interface elements"

# Create the repository
echo "Creating GitHub repository: $REPO_NAME"
curl -s -u "$USERNAME:$TOKEN" https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\", \"description\":\"$DESCRIPTION\", \"private\":false}" > repo_response.json

# Check if repository was created successfully
if grep -q "html_url" repo_response.json; then
    REPO_URL=$(grep -o '"html_url": "[^"]*' repo_response.json | grep -o '[^"]*$' | grep "$REPO_NAME")
    echo "Repository created successfully: $REPO_URL"
    
    # Configure git remote
    cd /home/user/clown-circuit-silly-ui
    git remote add origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git"
    
    # Push to GitHub
    echo "Pushing code to GitHub..."
    git push -u origin main
    
    echo "Repository setup complete!"
    echo "GitHub Repository URL: https://github.com/$USERNAME/$REPO_NAME"
    echo "GitHub Pages will be available at: https://$USERNAME.github.io/$REPO_NAME"
    echo ""
    echo "To enable GitHub Pages:"
    echo "1. Go to https://github.com/$USERNAME/$REPO_NAME/settings/pages"
    echo "2. Select 'main' branch as the source"
    echo "3. Click 'Save'"
else
    echo "Failed to create repository. Response:"
    cat repo_response.json
    exit 1
fi