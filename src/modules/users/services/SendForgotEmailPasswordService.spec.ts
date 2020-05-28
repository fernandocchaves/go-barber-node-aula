import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotEmailPasswordService: SendForgotEmailPasswordService;

describe('SendForgotEmailPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotEmailPasswordService = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fernando Cezar Chaves',
      email: 'fernandocchaves@gmail.com',
      password: '123456',
    });

    await sendForgotEmailPasswordService.execute({
      email: 'fernandocchaves@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing email', async () => {
    await expect(
      sendForgotEmailPasswordService.execute({
        email: 'fernandocchaves@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Fernando Cezar Chaves',
      email: 'fernandocchaves@gmail.com',
      password: '123456',
    });

    await sendForgotEmailPasswordService.execute({
      email: 'fernandocchaves@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
