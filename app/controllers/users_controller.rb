class UsersController < ApplicationController
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id # auto log in
      redirect_to(:back)
    else
      render :new
    end
  end

  def update
  end

  def edit
  end

  def destroy
  end

  def index
    @user = User.all
  end

  def show
  end

  protected

    def user_params
      params.require(:user).permit(:email, :username, :password)
    end

end
