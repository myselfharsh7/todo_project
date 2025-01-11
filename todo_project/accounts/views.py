from django.shortcuts import render, redirect
from django.contrib.auth import login

from .forms import RegistrationForm
from django.shortcuts import redirect
from django.contrib.auth import logout

def user_logout(request):
    # Log the user out
    logout(request)
    # Redirect to the homepage or login page after logout
    return redirect('accounts/register.html')  # Y



def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()  # This will now save the user with the hashed password
            login(request, user)  # Automatically logs the user in after registration
            return redirect('/')
    else:
        form = RegistrationForm()

    return render(request, 'accounts/register.html', {'form': form})
