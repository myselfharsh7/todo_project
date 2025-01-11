from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
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
            user = form.save()
            login(request, user)
            return redirect('/')
    else:
        form = RegistrationForm()

    return render(request, 'accounts/register.html', {'form': form})
