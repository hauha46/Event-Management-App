using EventApp.Entity;
using EventApp.Entity.ViewModel;
using EventApp.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace eCommerceWeb.API.Helpers
{
    public interface IUserService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest authenticateRequest);
    }
    public class UserService : IUserService
    {
        private readonly UserDomain userDomain;
        private readonly IOptions<AppSettings> _appSettings;

        public UserService(IOptions<AppSettings> options)
        {
            this.userDomain = new UserDomain();
            _appSettings = options;
        }
        
       public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest authenticateRequest)
        {
            var user = await userDomain.Authenticate(authenticateRequest.Username, authenticateRequest.Password);
            if(user == null)
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);

        }
        // helper methods
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
            var role = "User";
            if (user.Username.Equals("admin"))
            {
                role = "Admin";
            }
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("username", user.Username), new Claim(ClaimTypes.Role, role) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
