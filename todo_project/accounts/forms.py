from django import forms
from django.contrib.auth.models import User

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    password_confirmation = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean_password_confirmation(self):
        password = self.cleaned_data['password']
        password_confirmation = self.cleaned_data['password_confirmation']
        if password != password_confirmation:
            raise forms.ValidationError("Passwords do not match")
        return password_confirmation

    def save(self, commit=True):
        # Save the user instance without the password first
        user = super().save(commit=False)
        # Set the password using set_password to hash it
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
