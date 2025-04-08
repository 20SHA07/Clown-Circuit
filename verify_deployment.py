import os
import time
import requests
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
from datetime import datetime

def verify_github_pages(username, repo_name):
    """
    Verify that GitHub Pages is properly deployed and take screenshots.
    """
    # GitHub Pages URL format
    github_pages_url = f"https://{username}.github.io/{repo_name}/"
    repo_url = f"https://github.com/{username}/{repo_name}"
    
    print(f"Checking deployment at: {github_pages_url}")
    
    # Create screenshots directory if it doesn't exist
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
    
    # Try to access the GitHub Pages site
    try:
        response = requests.get(github_pages_url)
        if response.status_code == 200:
            print("✅ GitHub Pages site is accessible!")
            
            # Save the HTML content for reference
            with open("screenshots/page_content.html", "w", encoding="utf-8") as f:
                f.write(response.text)
            
            print("HTML content saved to screenshots/page_content.html")
            return {
                "success": True,
                "github_pages_url": github_pages_url,
                "repo_url": repo_url,
                "status_code": response.status_code
            }
        else:
            print(f"❌ GitHub Pages site returned status code: {response.status_code}")
            return {
                "success": False,
                "github_pages_url": github_pages_url,
                "repo_url": repo_url,
                "status_code": response.status_code
            }
    except Exception as e:
        print(f"❌ Error accessing GitHub Pages site: {str(e)}")
        return {
            "success": False,
            "github_pages_url": github_pages_url,
            "repo_url": repo_url,
            "error": str(e)
        }

def generate_report(username, repo_name, verification_result):
    """
    Generate a final report with deployment information.
    """
    report_filename = "deployment_report.md"
    
    with open(report_filename, "w") as f:
        f.write("# Clown Circuit Silly UI Challenge - Deployment Report\n\n")
        f.write(f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        f.write("## Deployment Information\n\n")
        f.write(f"- **GitHub Repository URL:** https://github.com/{username}/{repo_name}\n")
        f.write(f"- **Live GitHub Pages URL:** https://{username}.github.io/{repo_name}/\n\n")
        
        f.write("## Project Description\n\n")
        f.write("The Clown Circuit is a Silly UI Challenge project that features intentionally frustrating user interface elements. ")
        f.write("It includes moving buttons, chaotic layouts, annoying sound effects, and other anti-patterns in UI/UX design ")
        f.write("to demonstrate what NOT to do when creating user interfaces.\n\n")
        
        f.write("## Deployment Status\n\n")
        if verification_result.get("success", False):
            f.write("✅ **Deployment Status:** Successfully deployed\n")
            f.write(f"- **Status Code:** {verification_result.get('status_code')}\n\n")
        else:
            f.write("❌ **Deployment Status:** Deployment issues detected\n")
            if "status_code" in verification_result:
                f.write(f"- **Status Code:** {verification_result.get('status_code')}\n")
            if "error" in verification_result:
                f.write(f"- **Error:** {verification_result.get('error')}\n\n")
            f.write("\n**Note:** GitHub Pages may take up to 10 minutes to deploy after pushing to the repository.\n\n")
        
        f.write("## Next Steps\n\n")
        f.write("1. Visit the GitHub Pages URL to verify all features work correctly\n")
        f.write("2. Test interactive elements like moving buttons\n")
        f.write("3. Confirm audio functionality works\n")
        f.write("4. Check that infinite scroll functions as expected\n\n")
        
        f.write("## Manual Verification Checklist\n\n")
        f.write("- [ ] All visual elements display properly\n")
        f.write("- [ ] Interactive elements like moving buttons work\n")
        f.write("- [ ] Audio functionality works\n")
        f.write("- [ ] Infinite scroll functions as expected\n")
    
    print(f"Report generated: {report_filename}")
    return report_filename

if __name__ == "__main__":
    print("GitHub Pages Deployment Verification Tool")
    print("----------------------------------------")
    
    username = input("Enter your GitHub username: ")
    repo_name = "clown-circuit-silly-ui"
    
    verification_result = verify_github_pages(username, repo_name)
    report_file = generate_report(username, repo_name, verification_result)
    
    print("\nVerification complete!")
    print(f"Check {report_file} for the deployment report.")