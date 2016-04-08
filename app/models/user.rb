require 'bcrypt'

class User < ActiveRecord::Base
  # Remember to create a migration!
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :hashed_password, presence: true
  validate :check_password

  # has_many :channels, through: :subscriptions

  include BCrypt

  def password
    @password ||= Password.new(hashed_password)
  end

  def password=(new_password)
    @plain_text_password = new_password
    @password = Password.create(new_password)
    self.hashed_password = @password
  end

  def authenticate(entered_password)
    self.password == entered_password
  end

  def check_password
    if @plain_text_password.nil? || @plain_text_password == ""
      errors.add(:password, "is required (minimum six characters)")
    end
  end

end
